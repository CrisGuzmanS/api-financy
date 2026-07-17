import { Mail } from '@ellenode/maily';
import dotenv from 'dotenv';
import { vix } from 'vix';
import { Market } from '../packages/market/src/Market.js';

dotenv.config();

// Market must be open
if (!(await Market.isOpen())) {
    console.info('ℹ️ Market is closed');
    process.exit(0);
}

const currentVix = await vix();
const previousVix = await vix(-11);

// Check if VIX has changed
if (Math.floor(currentVix) === Math.floor(previousVix)) {
    console.info('ℹ️ VIX has not changed');
    process.exit(0);
}

// Send email
try {
    await Mail.from(process.env.MAIL_FROM)
        .to('cristian.guzman.contacto@gmail.com')
        .subject('Prueba')
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