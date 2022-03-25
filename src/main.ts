export { }

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

type CipherReturns = {
    normalizedInput: string
    normalizedKey: string
    output: string
}

function caesar(text: string, key: string, decrypt: boolean = false): CipherReturns | undefined {
    if (key === "") {
        alert("Veuillez indiquer une clé valable")
        return undefined
    }
    text = normalize(text)
    let shift = parseInt(key)
    if (decrypt) {
        shift *= -1
    }
    let result = ""
    for (let i = 0; i < text.length; i++) {
        const char = text[i]
        let index = ALPHABET.indexOf(char)
        if (index === -1) {
            result += char
        } else {
            result += ALPHABET[(index + shift + 26) % 26]
        }
    }
    return {
        normalizedInput: text,
        normalizedKey: key,
        output: result
    }
}

function vigenere(text: string, key: string, decrypt: boolean = false): CipherReturns | undefined {
    key = key.toUpperCase().replace(/[^A-Z]/g, "")
    if (key === "") {
        alert("Veuillez indiquer une clé valable")
        return undefined
    }
text = normalize(text)
    let result = ""
    for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const index = ALPHABET.indexOf(char)
        let keyIndex = ALPHABET.indexOf(key[i % key.length])
        if (index === -1 || keyIndex === -1) {
            result += char
        } else {
            keyIndex += 1 // so that 'A' shifts by 1
            if (decrypt) {
                keyIndex *= -1
            }
            result += ALPHABET[(index + keyIndex + 26) % 26]
        }
    }
    return {
        normalizedInput: text,
        normalizedKey: key,
        output: result
    }
}

function normalize(s: string): string {
    return s.toUpperCase()
}

function main() {
    for (const method of [caesar, vigenere]) {
        const name = method.name

        const container = document.querySelector(`.cipherzone.${name}`) as HTMLDivElement

        const plaintextField = container.querySelector(".plaintext") as HTMLTextAreaElement
        const ciphertextField = container.querySelector(".ciphertext") as HTMLTextAreaElement
        const keyField = container.querySelector(".key") as HTMLInputElement
        const encryptButton = container.querySelector(".encrypt") as HTMLButtonElement
        const decryptButton = container.querySelector(".decrypt") as HTMLButtonElement

        encryptButton.addEventListener("click", () => {
            const result = method(plaintextField.value, keyField.value, false)
            if (result) {
                console.log(result.output)
                plaintextField.value = result.normalizedInput
                keyField.value = result.normalizedKey
                ciphertextField.value = result.output
            }
        })

        decryptButton.addEventListener("click", () => {
            const result = method(ciphertextField.value, keyField.value, true)
            if (result) {
                console.log(result.output)
                ciphertextField.value = result.normalizedInput
                keyField.value = result.normalizedKey
                plaintextField.value = result.output
            }
        })

    }


}

document.addEventListener("DOMContentLoaded", main)