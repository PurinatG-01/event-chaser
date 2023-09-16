export interface Charge {
  object: string
  id: string
  livemode: boolean
  location: string
  created: string
  status: string
  amount: number
  currency: string
  description: any
  capture: boolean
  authorized: boolean
  reversed: boolean
  paid: boolean
  transaction: string
  card: any
  refunded: number
  refunds: Refunds
  failure_code: any
  failure_message: any
  customer: string
  ip: any
  dispute: any
  return_uri: string
  authorize_uri: string
  source_of_fund: string
  offsite: string
  source: Source
  metadata: Metadata
  expires_at: string
}

export interface Refunds {
  object: string
  id: string
  livemode: boolean
  location: string
  created: string
  from: string
  to: string
  offset: number
  limit: number
  total: number
  order: string
  data: any[]
}

export interface Source {
  object: string
  id: string
  livemode: boolean
  location: string
  created: string
  type: string
  flow: string
  amount: number
  currency: string
  scannable_code: ScannableCode
  references: any
  zero_interest_installments: boolean
  platform_type: string
}

export interface ScannableCode {
  object: string
  type: string
  image: Image
}

export interface Image {
  object: string
  id: string
  livemode: boolean
  location: string
  created: string
  deleted: boolean
  filename: string
  download_uri: string
}

export interface Metadata {}
