import "server-only";

import {detectBot, fixedWindow, protectSignup, sensitiveInfo, shield, slidingWindow} from '@arcjet/next'
import arcjet from '@arcjet/next'
import { env } from './env';

export {
 detectBot,
 fixedWindow,
 protectSignup,
 sensitiveInfo,
 shield,
 slidingWindow,   
}

export default arcjet({
    key: env.ARCJET_KEY,

    characteristics: ["fingerprint"],
    rules: [
      shield({
        mode: "LIVE",
      })  
    ] 
});
