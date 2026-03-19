import bcrypt from 'bcryptjs';

const hash = '$2b$12$PrSYCjoxakpfDfMvM0cDQ.4eKPWRWqJ6vqkHMA84lz4/clIJnuNTu';
const passwords = ['admin123', 'admin', 'password', 'therang', 'therang123', 'Admin123', 'Password123', '123456', 'rang', 'therang2024', 'therang2025'];

for (const p of passwords) {
  const match = await bcrypt.compare(p, hash);
  console.log(`Testing "${p}"... ${match ? '✅ MATCH FOUND!' : 'no'}`);
  if (match) {
    console.log(`\n🎉 Your admin password is: ${p}`);
    process.exit(0);
  }
}
console.log('\nNo common password matched.');
