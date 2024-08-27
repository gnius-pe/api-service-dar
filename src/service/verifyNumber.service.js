import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } from "../config.js";

const clientTwilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/**
 * Servicio para enviar un código de verificación al número de teléfono.
 * @param {string} number - El número de teléfono a verificar.
 * @param {string} countryCode - El código del país (por ejemplo, "+51" para Perú).
 * @returns {Object} - El estado de la verificación.
 * @throws {Error} - Si ocurre un error durante la verificación.
 */
export const verifyPhoneNumberService = async (number, countryCode = '+51') => {
    try {
        const responseVerify = await clientTwilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications
            .create({
                to: countryCode + number,
                channel: 'sms'
            });

        return { status: responseVerify.status };
    } catch (error) {
        //console.error("Error when verifying the number:", error);
        throw {
            status: error.status || 500,
            message: "Error when verifying the number",
            details: error.moreInfo
        };
    }
};

/**
 * Servicio para verificar un código de verificación enviado al número de teléfono.
 * @param {string} number - El número de teléfono que se está verificando.
 * @param {string} code - El código de verificación enviado al número de teléfono.
 * @param {string} countryCode - El código del país (por ejemplo, "+51" para Perú).
 * @returns {Object} - El estado de la verificación del código.
 * @throws {Error} - Si ocurre un error durante la verificación del código.
 */
export const checkPhoneNumberService = async (number, code, countryCode = '+51') => {
    try {
        const responseVeryfyCode = await clientTwilio.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verificationChecks
            .create({
                to: countryCode + number,
                code
            });

        return { status: responseVeryfyCode.status };
    } catch (error) {
        //console.error("Error when verifying the number:", error);
        throw {
            status: error.status || 500,
            message: "Error when verifying the number",
            details: error.moreInfo
        };
    }
};
