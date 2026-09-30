import { DUCK_LOG_LABEL, LOG_BASE_STYLE, logStateTransition, logWithLabel } from "../../utils"

export function shoutOut() {
  logStateTransition('SHOUT_CREDIT', "making sure to credit people...")
  logWithLabel("debug", "I did read what CC BY 4.0 means, and I have to say that it easier to understand than TOS, even for a non English native like me :)")
  const CAT_ASCII = `
                     \\    /\\
                      )  ( ')
                      (  /  )
                       \\(__)|
  `

  const messages = [
    "%cduck%c %cshouting out loud%c\n",
    CAT_ASCII,
    "\n",
    "%cMaxwell the cat (Dingus)%c %cby%c %c@bean(alwayshasbean)%c\n",
    "\n",
    "%cLicense%c: %cCC Attribution - CC BY 4.0%c\n",
    "|  https://creativecommons.org/licenses/by/4.0/",
    "\n\n",
    "%cOriginal work can be found on Sketchfab via here:%c\n",
    "https://sketchfab.com/3d-models/maxwell-the-cat-dingus-2ca7f3c1957847d6a145fc35de9046b0\n",
    "\n\n",
    "Thank you for making this model!\n"
  ]

  console.log(
    messages.join(''),
    DUCK_LOG_LABEL, "", 
    `${LOG_BASE_STYLE};background-color:#bd7aff`, "", 
    "font-size:20px;color:#fab387;font-weight:bold", "", 
    "font-size:20px", "", 
    "font-size:20px;color:#eba0ac;font-weight:bold", "",
    "color:#bac2de;font-weight:bold", "",
    "color:#74c7ec;font-weight:bold", "",
    "color:#bac2de;font-weight:bold", "",
  )
}
