export function formatHostSince(dateString: string) {
    const since = new Date(dateString);
    const now = new Date();

    let years = now.getFullYear() - since.getFullYear();
    let months = now.getMonth() - since.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    const yearText = years > 0 ? `${years} ano${years > 1 ? 's' : ''}` : '';
    const monthText = months > 0 ? `${months} mes${months > 1 ? 'es' : ''}` : '';

    if (yearText && monthText) return `${yearText} e ${monthText}`;
    if (yearText) return yearText;
    if (monthText) return monthText;
    return 'menos de um mês';
}