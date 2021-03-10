export interface ICompany {
    createDocument(data: FirebaseFirestore.DocumentData): Promise<string>; // handles the creation of the template company
    cleanUser(userId: string): Promise<void>; // handles the corresponding cleanup for the template company
}
