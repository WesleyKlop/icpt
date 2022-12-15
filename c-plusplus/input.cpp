#include <iostream>
#include <set>
#include <map>
#include <format>

void print(std::string message)
{
    std::cout << message;
}
void println(std::string message)
{
    std::cout << message << std::endl;
}

std::string get_user_input(std::string message)
{
    std::string input;
    do
    {
        print(message + "\x1b[32m");
        std::getline(std::cin, input);
        print("\x1b[0m");
        if (input != "")
            return input;
        println("Input mag niet leeg zijn");
    } while (true);
}

int get_user_input_int(std::string message)
{
    int result = 0;
    do
    {
        std::string input = get_user_input(message);
        try
        {
            result = std::stoi(input);
        }
        catch (const std::invalid_argument &e)
        {
            println("Input moet een geheel getal zijn");
        }
    } while (result == 0);
    return result;
}

int is_leap_year(int year)
{
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

int get_year()
{
    int year;
    while (true)
    {
        year = get_user_input_int("Jaar: ");
        if (year < 0)
            println("Jaar moet meer zijn dan 0");
        if (year > 4000)
            println("Jaar moet minder zijn dan 4000, ja dit is arbitrair");
        else
            return year;
    }
}

const std::map<std::string, int> months = {
    {"januari", 31},
    {"februari", 28},
    {"maart", 31},
    {"april", 30},
    {"mei", 31},
    {"juni", 30},
    {"juli", 31},
    {"augustus", 31},
    {"september", 30},
    {"oktober", 31},
    {"november", 30},
    {"december", 31},
};

std::string get_month()
{
    std::string month;
    while (true)
    {
        month = get_user_input("Maand: ");
        if (!months.contains(month))
            println("Maand is niet valide");
        else
            return month;
    }
}

int get_day(int year, std::string month)
{
    int day = 0;
    int daysInMonth = months.at(month);

    if (is_leap_year(year) && month == "februari")
        daysInMonth++;

    while (true)
    {
        day = get_user_input_int("Dag: ");
        if (day <= 0)
            println("Dag moet meer zijn dan 0");
        else if (day > daysInMonth)
            println("Dag moet minder zijn dan " + std::to_string(daysInMonth));
        else
            break;
    }
    return day;
}

int get_hour()
{
    int hour = 0;
    while (true)
    {
        hour = get_user_input_int("Uur: ");
        if (hour < 0)
            println("Uur moet meer zijn dan 0");
        else if (hour >= 24)
            println("Uur moet minder zijn dan 24");
        else
            break;
    }
    return hour;
}
int get_minute()
{
    int minute = 0;
    while (true)
    {
        minute = get_user_input_int("Minuut: ");
        if (minute < 0)
            println("Minuut moet meer zijn dan 0");
        else if (minute >= 60)
            println("Minuut moet minder zijn dan 60");
        else
            break;
    }
    return minute;
}

std::string fmt_count(int val, std::string singular, std::string plural)
{
    return std::to_string(val) + " " + (val == 1 ? singular : plural);
}

void print_result(int year, std::string month, int day, int hour, int minute)
{
    std::cout
        << fmt_count(year, "jaar", "jaren")
        << ", "
        << month
        << ", "
        << fmt_count(day, "dag", "dagen")
        << ", "
        << fmt_count(hour, "uur", "uren")
        << ", "
        << fmt_count(minute, "minuut", "minuten")
        << std::endl;

    println("Of in RFC3339 (ISO8601)");
    int monthNum = std::distance(months.begin(), months.find(month)) - 1;

    std::cout
        << std::to_string(year)
        << "-"
        << (monthNum < 10 ? "0" : "")
        << std::to_string(monthNum)
        << "-"
        << std::to_string(day)
        << "T"
        << std::to_string(hour)
        << ":"
        << std::to_string(minute)
        << ":00Z"
        << std::endl;
}

int main(int argc, char *argv[])
{
    println("Het grote datum input programma wat vooral groot is omdat het in \x1b[1m\x1b[31mC++\x1b[0m is geschreven.");
    int year = get_year();
    std::string month = get_month();
    int day = get_day(year, month);
    int hour = get_hour();
    int minute = get_minute();

    println("We hebben deze informatie van je gekregen:");
    print_result(year, month, day, hour, minute);
}