import { Mail } from '@ellenode/maily';
import dotenv from 'dotenv';
import { vix } from 'vix';
import { Market } from '../packages/market/src/Market.js';
import { Vix } from 'vix/src/Vix.js';
import { Telegram } from '../src/helpers/Telegram.js';

dotenv.config();

// Market must be open
if (!(await Market.isOpen())) {
    console.info('ℹ️ Market is closed');
    process.exit(0);
}

const currentVix = await vix();
const previousVix = await vix(-11);

// Check if VIX has changed
if (currentVix === previousVix) {
    console.info('ℹ️ VIX has not changed');
    process.exit(0);
}

if(previousVix === await Vix.read('.previous-vix') && currentVix === await Vix.read('.current-vix')) {
    console.info('ℹ️ VIX has not changed');
    process.exit(0);
}

await Vix.store(currentVix, '.current-vix');
await Vix.store(previousVix, '.previous-vix');

let subject = previousVix < currentVix ? '🟢' : '🔴';
subject = `${subject} VIX de ${previousVix} a ${currentVix}`;

// Send email
try {

    await Telegram.send(subject);

    await Mail.from(process.env.MAIL_FROM)
        .to('cristian.guzman.contacto@gmail.com')
        .subject(subject)
        .html('./templates/vix.html')
        .data({
            current: currentVix,
            previous: previousVix
        })
        .send();

    console.info('✅ Email sent');
} catch (error) {
    console.error('❌ Error sending email:', error);
    process.exit(1);
}