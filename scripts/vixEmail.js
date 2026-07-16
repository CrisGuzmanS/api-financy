import { Mail } from '@ellenode/maily';
import dotenv from 'dotenv';
import { vix } from 'vix';

dotenv.config();

const currentVix = await vix();
const previousVix = await vix(-11);

Mail.from(process.env.MAIL_FROM)
    .to('cristian.guzman.contacto@gmail.com')
    .subject('Prueba')
    .html('./templates/vix.html')
    .data({
        current: currentVix,
        previous: previousVix
    })
    .send();