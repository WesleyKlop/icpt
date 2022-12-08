class Triangle
{
    public delegate void TriangleModification(int amount);
    public int Width { get; private set; }
    public int Height { get; private set; }

    public Triangle(int width, int height)
    {
        this.Width = width;
        this.Height = height;
    }

    public void AddWidth(int width)
    {
        this.Width += width;
    }

    public void AddHeight(int height)
    {
        this.Height += height;
    }
    public void AddSize(int size)
    {
        this.Width += size;
        this.Height += size;
    }
}
