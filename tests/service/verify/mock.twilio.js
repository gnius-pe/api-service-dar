import { jest } from '@jest/globals';

const mockCreateVerification = jest.fn((options) => {
    if (options.to && options.channel === 'sms') {
        return Promise.resolve({ status: 'pending' });
    } else {
        return Promise.reject(new Error('Error when verifying the number'));
    }
});

const mockCreateVerificationCheck = jest.fn().mockResolvedValue({ status: 'approved' });

jest.mock('twilio', () => {
    return jest.fn().mockImplementation(() => ({
        verify: {
            v2: {
                services: () => ({
                    verifications: {
                        create: mockCreateVerification,
                    },
                    verificationChecks: {
                        create: mockCreateVerificationCheck,
                    }
                })
            }
        }
    }));
});

export { mockCreateVerification, mockCreateVerificationCheck };
