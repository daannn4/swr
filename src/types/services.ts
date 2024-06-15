export type ServiceType<T, U extends unknown[]> = {
    name?: string;
    callback: (...args: U) => Promise<T>
}