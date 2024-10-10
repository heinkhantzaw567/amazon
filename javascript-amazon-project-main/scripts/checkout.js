import {renderOrderSummary} from './checkout/ordersummary.js'
import { renderPaymentSummary } from './checkout/paymentcheckout.js';
import { skipweekend } from './utils/money.js';
renderOrderSummary();
renderPaymentSummary();



