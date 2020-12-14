const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51HyNurH6AduFV6L4Y18MEbhiQWElP2foz3cfRxanVoE3YraV4owckyXSFUtVNrlAwjhCvadPK4X0rerp9fp7wDpN007xHyonvg');
admin.initializeApp(functions.config().firebase);

exports.stripeChargeCall = functions.https.onCall(async (data, context) => {

  if (!data || data.charge) return;
  const doc = admin.firestore().collection('sources').doc();
  doc.set(data);

  const source = data.id;
  const email = 'accelkun2100@gmail.com';

  const customer = await stripe.customers.create({ email, source});

  const idempotencyKey = doc.id;
  const amount = data.amount;
  const currency = 'usd';

  const charge = { amount, currency, source, customer: customer.id };

  const charge_1 = await (stripe.charges.create(charge, { idempotencyKey }));

  if (charge_1.paid === true) {
    admin.firestore().collection('charges').doc().set(charge_1);
    return {result: 'SUCCESSFUL'};
  } else {
    admin.firestore().collection('charges_error').doc().set({charge_1});
    return {result: 'FAILED'};
  }
});
