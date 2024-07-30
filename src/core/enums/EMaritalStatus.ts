export enum EMaritalStatus {
    Single = "Single",
    Married = "Married",
    DomesticPartnership = "DomesticPartnership",
    SeparatedDivorced = "SeparatedDivorced",
    Widowed = "Widowed"
}

export const MaritalStatusTranslations: { [key in EMaritalStatus]: string } = {
    [EMaritalStatus.Single]: "Solteiro",
    [EMaritalStatus.Married]: "Casado",
    [EMaritalStatus.DomesticPartnership]: "União Estável",
    [EMaritalStatus.SeparatedDivorced]: "Separado/Divorciado",
    [EMaritalStatus.Widowed]: "Viúvo"
};
