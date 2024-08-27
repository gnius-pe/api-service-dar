import { mockCreateVerification, mockCreateVerificationCheck } from './mock.twilio.js';
import { verifyPhoneNumberService, checkPhoneNumberService } from '../../../src/service/verifyNumber.service.js';



describe('Twilio Services - Unit Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send verification code successfully', async () => {
        const response = await verifyPhoneNumberService('123456789');
        expect(mockCreateVerification).toHaveBeenCalledWith({
            to: '+51123456789',
            channel: 'sms',
        });
        expect(response).toEqual({ status: 'pending' });

    });

    it('should send verification code to a number with a different country code', async () => {
        const response = await verifyPhoneNumberService('987654321', '+1'); // Código de país para EE.UU.
    
        expect(mockCreateVerification).toHaveBeenCalledWith({
            to: '+1987654321',
            channel: 'sms',
        });
        expect(response).toEqual({ status: 'pending' });
    });

    it('should handle errors during verification', async () => {
        mockCreateVerification.mockRejectedValue({
            status: 500,
            moreInfo: 'Mock error details',
        });
    
        await expect(verifyPhoneNumberService('123456789')).rejects.toEqual({
            status: 500,
            message: 'Error when verifying the number',
            details: 'Mock error details',
        });
    });
   
    it('should verify phone number code successfully', async () => {
        const response = await checkPhoneNumberService('123456789', '123456');
        expect(mockCreateVerificationCheck).toHaveBeenCalledWith({
            to: '+51123456789',
            code: '123456',
        });
        expect(response).toEqual({ status: 'approved' });
    });

    it('should handle errors during phone number verification check', async () => {
        mockCreateVerificationCheck.mockRejectedValue({
            status: 400,
            moreInfo: 'Mock error details',
        });
    
        await expect(checkPhoneNumberService('123456789', '123456')).rejects.toEqual({
            status: 400,
            message: 'Error when verifying the number',
            details: 'Mock error details',
        });
    });

    it('should verify phone number code successfully with a different country code', async () => {
        mockCreateVerificationCheck.mockResolvedValue({ status: 'approved' });
    
        const response = await checkPhoneNumberService('987654321', '123456', '+1');
        
        expect(mockCreateVerificationCheck).toHaveBeenCalledWith({
            to: '+1987654321',
            code: '123456',
        });
        expect(response).toEqual({ status: 'approved' });
    });
    
    it('should handle non-existent phone number', async () => {
        mockCreateVerificationCheck.mockResolvedValue({ status: 'not_found' });
    
        const response = await checkPhoneNumberService('000000000', '123456');
        
        expect(mockCreateVerificationCheck).toHaveBeenCalledWith({
            to: '+51000000000',
            code: '123456',
        });
        expect(response).toEqual({ status: 'not_found' });
    });

    it('should handle expired verification code', async () => {
        mockCreateVerificationCheck.mockResolvedValue({ status: 'expired' });
    
        const response = await checkPhoneNumberService('123456789', 'expired-code');
        
        expect(mockCreateVerificationCheck).toHaveBeenCalledWith({
            to: '+51123456789',
            code: 'expired-code',
        });
        expect(response).toEqual({ status: 'expired' });
    });

    it('should handle inactive verification code', async () => {
        mockCreateVerificationCheck.mockResolvedValue({ status: 'inactive' });
    
        const response = await checkPhoneNumberService('123456789', '123456');
        
        expect(mockCreateVerificationCheck).toHaveBeenCalledWith({
            to: '+51123456789',
            code: '123456',
        });
        expect(response).toEqual({ status: 'inactive' });
    });

    // covertura 

    it('should handle errors with status and details during phone number verification', async () => {
        mockCreateVerification.mockRejectedValue({
            status: 400,
            moreInfo: 'Mock error details',
        });
    
        await expect(verifyPhoneNumberService('123456789')).rejects.toEqual({
            status: 400,
            message: 'Error when verifying the number',
            details: 'Mock error details',
        });
    });
    
    it('should handle errors without status and provide default during phone number verification', async () => {
        mockCreateVerification.mockRejectedValue({
            moreInfo: 'Mock error details',
        });
    
        await expect(verifyPhoneNumberService('123456789')).rejects.toEqual({
            status: 500,
            message: 'Error when verifying the number',
            details: 'Mock error details',
        });
    });
    
    it('should handle errors with status and details during verification code check', async () => {
        mockCreateVerificationCheck.mockRejectedValue({
            status: 401,
            moreInfo: 'Mock error details',
        });
    
        await expect(checkPhoneNumberService('123456789', '123456')).rejects.toEqual({
            status: 401,
            message: 'Error when verifying the number',
            details: 'Mock error details',
        });
    });

    it('should handle errors without status and provide default during verification code check', async () => {
        mockCreateVerificationCheck.mockRejectedValue({
            moreInfo: 'Mock error details',
        });
    
        await expect(checkPhoneNumberService('123456789', '123456')).rejects.toEqual({
            status: 500,
            message: 'Error when verifying the number',
            details: 'Mock error details',
        });
    });
    
    
});