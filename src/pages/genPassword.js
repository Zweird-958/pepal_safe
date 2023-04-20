import ButtonIcon from "@/web/components/ButtonIcon"
import CheckboxInput from "@/web/components/CheckboxInput"
import Page from "@/web/components/Page"
import { useState } from "react"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import generatePassword from "@/web/utils/generatePassword"

const GenPassword = () => {
  const [passwordLength, setPasswordLength] = useState(30)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    const length = document.getElementById("length")
    const upper = document.getElementById("upper")
    const lower = document.getElementById("lower")
    const number = document.getElementById("number")
    const symbol = document.getElementById("symbol")

    const values = {
      length: length.value,
      upper: upper.checked,
      lower: lower.checked,
      number: number.checked,
      symbol: symbol.checked,
    }

    const newPassword = generatePassword(values)
    setPassword(newPassword)

    if (newPassword === "") {
      return
    }

    navigator.clipboard.writeText(newPassword)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <Page variant="small">
      <div className="bg-neutral-100 rounded-md p-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="mb-3">
            <p className="font-medium">Générateur de mot de passe</p>
            <p className="text-sm">Choisissez vos paramètres.</p>
          </div>
          <div className="bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg">
            <div className="px-2 py-1 bg-neutral-100 rounded-md text-sm">
              <div className="flex">
                <CheckboxInput
                  id="upper"
                  type="checkbox"
                  label="ABC"
                ></CheckboxInput>
                <CheckboxInput
                  id="lower"
                  type="checkbox"
                  label="abc"
                ></CheckboxInput>
                <CheckboxInput
                  id="number"
                  type="checkbox"
                  label="123"
                ></CheckboxInput>
                <CheckboxInput
                  id="symbol"
                  type="checkbox"
                  label="#$&"
                ></CheckboxInput>
              </div>
              <div>
                <CheckboxInput
                  id="length"
                  name="length"
                  type="range"
                  min="10"
                  max="30"
                  step="1"
                  className="w-full"
                  onChange={() => {
                    setPasswordLength(document.getElementById("length").value)
                  }}
                  label={passwordLength}
                ></CheckboxInput>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-1">
            <div className="bg-gradient-to-r font from-violet-400 via-indigo-400 to-blue-400 p-0.5 rounded-lg w-full">
              <div className="px-2 py-1 bg-neutral-100 rounded-md text-sm w-full">
                <input
                  className="w-full bg-neutral-100 "
                  disabled
                  value={password}
                />
              </div>
            </div>
            <div>
              <ButtonIcon type="button" onClick={handleClick}>
                <ArrowPathIcon className="p-1 w-6"></ArrowPathIcon>
              </ButtonIcon>
            </div>
          </div>
          {copied && (
            <div>
              <p className="text-xs ml-1">
                Mot de passe copié dans le presse-papier.
              </p>
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}

export default GenPassword
