import {z} from "zod";
import v2122 from "./2021-2022.json"
import v2223 from "./2022-2023.json"
import v2324 from "./2023-2024.json"
import v2425 from "./2024-2025.json"

const TempoDays = z.record(z.string(), z.enum(["RED", "WHITE", "BLUE"]))
const cleanupDays = (input: { values: object }) => {
  return TempoDays.parse(Object.fromEntries(Object.entries(input.values).filter(([key]) => !key.endsWith("-fallback"))))
}

export const tempoDays = {
  ...cleanupDays(v2122),
  ...cleanupDays(v2223),
  ...cleanupDays(v2324),
  ...cleanupDays(v2425),
}
