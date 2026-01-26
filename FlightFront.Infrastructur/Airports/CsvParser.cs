using FlightFront.Application.Airports.Queries.SearchAirports;
using System.Text;

namespace FlightFront.Infrastructure.Airports;
public static class CsvParser
{
    public static List<AirportDto> ParseAirports(string csvData)
    {
        var lines = csvData.Split('\n', StringSplitOptions.RemoveEmptyEntries);
        
        if (lines.Length == 0)
            return [];

        var columnIndices = ParseHeader(lines[0]);
        var airports = new List<AirportDto>(capacity: 5000);

        for (int i = 1; i < lines.Length; i++)
        {
            var airport = ParseAirportLine(lines[i], columnIndices);
            
            if (airport is not null)
                airports.Add(airport);
        }

        return airports
            .OrderBy(a => a.Icao, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static ColumnIndices ParseHeader(string headerLine)
    {
        var columns = SplitCsvLine(headerLine);
        
        return new ColumnIndices(
            Ident: FindColumnIndex(columns, "ident"),
            Name: FindColumnIndex(columns, "name"),
            Municipality: FindColumnIndex(columns, "municipality"),
            Country: FindColumnIndex(columns, "iso_country")
        );
    }

    private static AirportDto? ParseAirportLine(string line, ColumnIndices indices)
    {
        var fields = SplitCsvLine(line);

        if (indices.Ident >= fields.Count || indices.Name >= fields.Count)
            return null;

        var icaoCode = fields[indices.Ident].Trim().ToUpperInvariant();
        
        if (!IsValidIcaoCode(icaoCode))
            return null;

        var name = fields[indices.Name].Trim();
        
        if (string.IsNullOrWhiteSpace(name))
            return null;

        var municipality = GetFieldOrNull(fields, indices.Municipality);
        var country = GetFieldOrNull(fields, indices.Country);

        return new AirportDto(icaoCode, name, municipality, country);
    }

    private static bool IsValidIcaoCode(string code)
    {
        return code.Length == 4 && code.All(char.IsLetter);
    }

    private static string? GetFieldOrNull(List<string> fields, int index)
    {
        if (index < 0 || index >= fields.Count)
            return null;

        var value = fields[index].Trim();
        return string.IsNullOrWhiteSpace(value) ? null : value;
    }
    private static int FindColumnIndex(List<string> columns, string columnName)
    {
        for (int i = 0; i < columns.Count; i++)
        {
            if (columns[i].Equals(columnName, StringComparison.OrdinalIgnoreCase))
                return i;
        }
        return -1;
    }

    private static List<string> SplitCsvLine(string line)
    {
        var fields = new List<string>();
        var currentField = new StringBuilder();
        bool insideQuotes = false;

        for (int i = 0; i < line.Length; i++)
        {
            char currentChar = line[i];

            if (currentChar == '"')
            {
                // Hantera escaped quotes: "" → "
                if (insideQuotes && i + 1 < line.Length && line[i + 1] == '"')
                {
                    currentField.Append('"');
                    i++; // Hoppa över nästa quote
                }
                else
                {
                    insideQuotes = !insideQuotes;
                }
                continue;
            }

            // Komma utanför quotes = nytt fält
            if (currentChar == ',' && !insideQuotes)
            {
                fields.Add(currentField.ToString());
                currentField.Clear();
                continue;
            }

            currentField.Append(currentChar);
        }

        // Lägg till sista fältet
        fields.Add(currentField.ToString());
        
        return fields;
    }
    private record ColumnIndices(int Ident, int Name, int Municipality, int Country);
}
