#include <stdio.h>

// Assume it is not a leap year
int SECONDS_IN_YEAR = 31540000;
// Assume a month is 28 days (4 weeks)
int SECONDS_IN_MONTH = 2628000;
int SECONDS_IN_DAY = 86400;
int SECONDS_IN_HOUR = 3600;
int SECONDS_IN_MINUTE = 60;

int get_user_input()
{
    int val;
    do
    {
        printf("Hoeveel seconden moeten er omgerekend worden? \x1b[32m");
        scanf("%d", &val);
        printf("\x1b[0m");
    } while (val <= 0ul);
    return val;
}

typedef struct
{
    int years;
    int months;
    int days;
    int hours;
    int minutes;
    int seconds;
} Parts;

Parts calculate_parts(int seconds)
{
    Parts parts;

    parts.years = (int)(seconds / SECONDS_IN_YEAR);
    seconds = seconds % SECONDS_IN_YEAR;
    parts.months = ((int)(seconds / SECONDS_IN_MONTH));
    seconds = seconds % SECONDS_IN_MONTH;
    parts.days = ((int)(seconds / SECONDS_IN_DAY));
    seconds = seconds % SECONDS_IN_DAY;
    parts.hours = ((int)(seconds / SECONDS_IN_HOUR));
    seconds = seconds % SECONDS_IN_HOUR;
    parts.minutes = ((int)(seconds / SECONDS_IN_MINUTE));
    seconds = seconds % SECONDS_IN_MINUTE;
    parts.seconds = seconds % SECONDS_IN_MINUTE;

    return parts;
}

void print_count(int val, char *singular, char *plural)
{
    printf("%d %s", val, val == 1 ? singular : plural);
}

void print_parts(Parts parts)
{
    print_count(parts.years, "jaar", "jaren");
    printf(", ");
    print_count(parts.months, "maand", "maanden");
    printf(", ");
    print_count(parts.days, "dag", "dagen");
    printf(", ");
    print_count(parts.hours, "uur", "uren");
    printf(", ");
    print_count(parts.minutes, "minuut", "minuten");
    printf(" en ");
    print_count(parts.seconds, "seconde", "seconden");
    printf("\n");
}

int main(int argc, char *argv[])
{
    int input = get_user_input();

    Parts parts = calculate_parts(input);

    print_parts(parts);

    return 0;
}