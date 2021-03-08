export interface ICompany {
    createDocument(data: FirebaseFirestore.DocumentData): Promise<string>;
    cleanUser(userId: string): Promise<void>;
}
