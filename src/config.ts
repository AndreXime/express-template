import { CookieOptions } from 'express';
import argon2 from 'argon2';

export const ARGON_SECRET = Buffer.from(process.env.ARGON2_KEY || '123');

export const COOKIE_OPTIONS: CookieOptions = {
	maxAge: 2 * 60 * 60 * 1000,
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	domain: process.env.DOMAIN,
	sameSite: 'lax',
};

export const ARGON_OPTIONS = {
	type: argon2.argon2id,
	memoryCost: 19456, // 19MB (recomendado OWASP)
	timeCost: 2, // (recomendado OWASP)
	parallelism: 1,
	secret: ARGON_SECRET,
	hashLength: 32, // Tamanho do hash em bytes
};
