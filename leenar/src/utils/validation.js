/** Shared form validation patterns. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** 10-digit Indian mobile, optionally prefixed +91 / 91 / 0 (strip spaces and dashes first). */
export const PHONE_PATTERN = /^(?:\+?91|0)?[6-9]\d{9}$/
export const PINCODE_PATTERN = /^[1-9]\d{5}$/

export const cleanPhone = (value) => value.replace(/[\s-]/g, '')
