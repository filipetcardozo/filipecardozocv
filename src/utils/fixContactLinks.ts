export const fixContactLinks = (html: string): string => {
  return html
    // Corrige email (caso o texto esteja certo mas o href errado)
    .replace(
      /<a\s+href=["']mailto:[^"']+["']>(filipetcardozo@gmail\.com)<\/a>/i,
      '<a href="mailto:filipetcardozo@gmail.com">$1</a>'
    )

    // Corrige telefone em português: (53) 99967-0470
    .replace(
      /<a\s+href=["'][^"']*["']>\(53\)\s*99967-0470<\/a>/i,
      '<a href="tel:+5553999670470">(53) 99967-0470</a>'
    )

    // Corrige telefone em inglês: +55 (53) 99967-0470
    .replace(
      /<a\s+href=["'][^"']*["']>\+55\s*\(53\)\s*99967-0470<\/a>/i,
      '<a href="tel:+5553999670470">+55 (53) 99967-0470</a>'
    );
};
