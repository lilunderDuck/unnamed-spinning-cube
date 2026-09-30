const predefinedLabels = {
  debug: "#525eff",
  player: "#dd2977",
  "state transition": "#ff36d3",
  "shouting out loud": "#bd7aff"
}

const BASE_STYLE = "color: #11111b; padding-inline: 5px; border-radius: 6px; font-weight: bold"

export function duckDotLog(...something: any[]) {
  console.log(`%cduck%c`, `${BASE_STYLE};background-color: #ebb748`, "", ...something)
}

export function logWithLabel(label: keyof typeof predefinedLabels, ...something: any[]) {
  console.log(
    `%cduck%c %c${label}%c`, 
    `${BASE_STYLE};background-color: #ebb748`, "",
    `${BASE_STYLE};background-color: ${predefinedLabels[label]}`, "", 
    ...something
  )
}