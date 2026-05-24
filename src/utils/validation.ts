export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const validateContributionAmount = (amount: string): ValidationResult => {
  const num = parseFloat(amount);
  if (!amount || isNaN(num)) return { isValid: false, error: 'Amount is required' };
  if (num <= 0) return { isValid: false, error: 'Amount must be greater than 0' };
  if (num < 0.0001) return { isValid: false, error: 'Minimum amount is 0.0001 CELO' };
  if (num > 1000) return { isValid: false, error: 'Maximum amount is 1000 CELO' };
  return { isValid: true, error: '' };
};

export const validateMaxMembers = (value: string): ValidationResult => {
  const num = parseInt(value, 10);
  if (!value || isNaN(num)) return { isValid: false, error: 'Max members is required' };
  if (num < 2) return { isValid: false, error: 'Minimum 2 members required' };
  if (num > 100) return { isValid: false, error: 'Maximum 100 members allowed' };
  return { isValid: true, error: '' };
};

export const validateVotingThreshold = (value: string): ValidationResult => {
  const num = parseInt(value, 10);
  if (!value || isNaN(num)) return { isValid: false, error: 'Voting threshold is required' };
  if (num < 1) return { isValid: false, error: 'Minimum threshold is 1%' };
  if (num > 100) return { isValid: false, error: 'Maximum threshold is 100%' };
  return { isValid: true, error: '' };
};

export const validateGroupId = (value: string): ValidationResult => {
  const num = parseInt(value, 10);
  if (!value || isNaN(num)) return { isValid: false, error: 'Group ID is required' };
  if (num < 1) return { isValid: false, error: 'Group ID must be a positive number' };
  return { isValid: true, error: '' };
};

export const validateWithdrawalReason = (reason: string): ValidationResult => {
  if (!reason.trim()) return { isValid: false, error: 'Reason is required' };
  if (reason.trim().length < 10) return { isValid: false, error: 'Please provide a more detailed reason (min 10 chars)' };
  if (reason.trim().length > 500) return { isValid: false, error: 'Reason too long (max 500 chars)' };
  return { isValid: true, error: '' };
};
