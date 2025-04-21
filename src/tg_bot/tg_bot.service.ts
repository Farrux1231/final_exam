import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class TgBotService {
  private bot: Telegraf;
  chatId:number
  constructor(private readonly prisma: PrismaService) {
    this.bot = new Telegraf('7868412796:AAEu261ATscCB93MDdjukyj26b8eRTvUrfA');  
      
    
    this.bot.start((ctx) => {
        // this.chatId = ctx.chat.id; 
        
        this.handleStart(ctx);
        this.bot.launch();
    }); 
}

private async handleStart(ctx: any) {
    // console.log(this.chatId);
    const userName = ctx.from.first_name || 'Guest'; 
    const catid = ctx.from.chatId
    
    
    await ctx.reply(`Hello ${userName}, you're welcome!`);
  }

  async sendOrderDetailsToUser(userId: number, orderId: number) {
    try {
      const order = await this.getOrderDetails(orderId);

      if (!order) {
        console.error('Order not found!');
        return;
      }
      let withDelivery:string = ''
      if(order.withDelivery == false){
        withDelivery = 'ha'
      }else{
        withDelivery = 'yuq'
      }

      const message = `
      New Order Created:
      Order ID: ${order.id}
      
      Details:
      - Address: ${order.address}
      - Date: ${order.date}
      - Instructions: ${order.instruction}
      - Location: ${order.location}
      - Pay Type: ${order.pay_type}
      - Total: ${order.total}
      - With Delivery: ${withDelivery}
      
      Thank you for your order!
      `;
      
    //   const chatId = this.usersChatIds.get(userId); 
    const catid = 6092325564
      if (catid) {
        await this.bot.telegram.sendMessage(catid, message); 
        return
      } else {
        console.error('User chatId not found');
      }
    } catch (error) {
      console.error('Error sending order details:', error);
    }
  }

  private async getOrderDetails(orderId: number) {
    return await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderProduct: true }, 
    });
  }
}
