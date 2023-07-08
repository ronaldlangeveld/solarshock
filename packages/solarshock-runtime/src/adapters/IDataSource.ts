export interface IDataSource <T> {
    fetchData(inverterId: string): Promise<T>;
}
