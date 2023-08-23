
class Fibonacci
{
    static void FibonacciStackOverflow()
    {
        int Fibonacci(int n) => n switch
        {
            <= 1 => n,
            _ => Fibonacci(n - 1) + Fibonacci(n - 2)
        };
        Fibonacci(Int32.MaxValue);
    }
}