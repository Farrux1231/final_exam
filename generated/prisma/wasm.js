
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  password: 'password',
  status: 'status',
  role: 'role',
  regionId: 'regionId',
  stir: 'stir',
  mfo: 'mfo',
  hr: 'hr',
  bank: 'bank',
  oked: 'oked',
  manzil: 'manzil'
};

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  ip: 'ip',
  userId: 'userId',
  date: 'date'
};

exports.Prisma.LevelScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  message: 'message',
  star: 'star'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PowerScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.MasterScalarFieldEnum = {
  id: 'id',
  fullname: 'fullname',
  phone: 'phone',
  isActive: 'isActive',
  image: 'image',
  passportImage: 'passportImage',
  star: 'star',
  about: 'about'
};

exports.Prisma.MasterProfessionsScalarFieldEnum = {
  id: 'id',
  minWorking_h: 'minWorking_h',
  professionId: 'professionId',
  levelId: 'levelId',
  price_h: 'price_h',
  price_d: 'price_d',
  experience: 'experience',
  masterId: 'masterId'
};

exports.Prisma.ProfessionLevelScalarFieldEnum = {
  id: 'id',
  professionId: 'professionId',
  levelId: 'levelId',
  minWorking_h: 'minWorking_h',
  price_h: 'price_h',
  price_d: 'price_d'
};

exports.Prisma.ProfessionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image: 'image',
  isActive: 'isActive'
};

exports.Prisma.ToolsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  desc: 'desc',
  price_h: 'price_h',
  price_d: 'price_d',
  quantity: 'quantity',
  code: 'code',
  brandId: 'brandId',
  isActive: 'isActive',
  powerId: 'powerId',
  sizeId: 'sizeId',
  image: 'image'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  total: 'total',
  location: 'location',
  address: 'address',
  date: 'date',
  pay_type: 'pay_type',
  withDelivery: 'withDelivery',
  status: 'status',
  instruction: 'instruction',
  userId: 'userId'
};

exports.Prisma.OrderProductScalarFieldEnum = {
  id: 'id',
  isActive: 'isActive',
  timeUnit: 'timeUnit',
  workingTime: 'workingTime',
  price: 'price',
  count: 'count',
  toolId: 'toolId',
  levelId: 'levelId',
  orderId: 'orderId',
  professionId: 'professionId'
};

exports.Prisma.FAQScalarFieldEnum = {
  id: 'id',
  answer: 'answer',
  quiteions: 'quiteions'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  name: 'name',
  surname: 'surname',
  phone: 'phone',
  address: 'address',
  message: 'message'
};

exports.Prisma.GeneralInfoScalarFieldEnum = {
  id: 'id',
  link: 'link',
  email: 'email',
  phone: 'phone'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Region: 'Region',
  Session: 'Session',
  Level: 'Level',
  Comment: 'Comment',
  Brand: 'Brand',
  Power: 'Power',
  Size: 'Size',
  Master: 'Master',
  masterProfessions: 'masterProfessions',
  professionLevel: 'professionLevel',
  Profession: 'Profession',
  Tools: 'Tools',
  Order: 'Order',
  orderProduct: 'orderProduct',
  FAQ: 'FAQ',
  Contact: 'Contact',
  generalInfo: 'generalInfo'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
