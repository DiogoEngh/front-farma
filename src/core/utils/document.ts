export const formatCPF = (document: string) => {
    if (!document) return ''
    document = document.replace(/\D/g, '')
    document = document.substring(0, 11)
    document = document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    return document
}

export const formatRg = (document: string) => {
    if (!document) return ''
    document = document.replace(/\D/g, '')
    document = document.substring(0, 9)
    document = document.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
    return document
}

export const formatCpfCnpj = (document: string) => {
    document = document.replace(/\D/g, '')
    if (document.length <= 11) {
        document = document?.replace(/\D/g, '');
        document = document?.replace(/(\d{3})(\d)/, '$1.$2');
        document = document?.replace(/(\d{3})(\d)/, '$1.$2');
        document = document?.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
        document = document?.replace(/\D/g, '');
        document = document?.replace(/(\d{2})(\d)/, '$1.$2');
        document = document?.replace(/(\d{3})(\d)/, '$1.$2');
        document = document?.replace(/(\d{3})(\d)/, '$1/$2');
        document = document?.replace(/(\d{4})(\d{1,2})/, '$1-$2');
        document = document?.replace(/(-\d{2})\d+?$/, '$1');
    }
    return document;
}

export function formatDocument(document: string) {
    if (document?.length <= 11) {
        return document?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else {
        return document?.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            '$1.$2.$3/$4-$5'
        )
    }
}

export const validCpf = (document: string) => {

    if (!document) return false

    document = document.replace(/[^\d]+/g, '');

    if (document.length !== 11) return false;

    if (/^(\d)\1+$/.test(document)) return false;

    let sum = 0;
    let rest;

    for (let index = 1; index <= 9; index++) {
        sum = sum + parseInt(document.substring(index - 1, index)) * (11 - index);
    }

    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }

    if (rest !== parseInt(document.substring(9, 10))) return false;
    sum = 0;

    for (let index = 1; index <= 10; index++) {
        sum = sum + parseInt(document.substring(index - 1, index)) * (12 - index);
    }

    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }

    if (rest !== parseInt(document.substring(10, 11))) return false;
    return true;
}

export const validCnpj = (document: string) => {

    if (!document) return false

    document = document.replace(/[^\d]+/g, '');

    if (document.length !== 14) return false;

    if (/^(\d)\1+$/.test(document)) return false;

    let size = document.length - 2;
    let numbers = document.substring(0, size);
    let digits = document.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let index = size; index >= 1; index--) {
        sum += parseInt(numbers.charAt(size - index)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = document.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let index = size; index >= 1; index--) {
        sum += parseInt(numbers.charAt(size - index)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result !== parseInt(digits.charAt(1))) return false;
    return true;

}

export const validDocument = (document: string) => {
    document = document.replace(/[^\d]+/g, '');
    if (document.length === 11) return validCpf(document);
    else if (document.length === 14) return validCnpj(document);
    else return false;
}