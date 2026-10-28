using UnityEngine;
using System.IO;

public static class ReportCreator
{
    private static readonly string path =
        Application.dataPath + "/estatisticas.txt";

    public static void resetReport()
    {
        File.WriteAllText(path, string.Empty);
    }

    public static void writeLine(string line)
    {
        File.AppendAllText(path, line + System.Environment.NewLine);
    }

    public static void writeResponseTime(double responseTime)
    {
        writeLine($"Tempo de resposta da atividade: {responseTime:F2}");
    }

    public static void writeMissesPerPhase(byte[] misses)
    {
        for (int i = 0; i < misses.Length; i++)
            writeLine($"Quantidade de erros da questao {i + 1}: {misses[i]}");
    }

    public static void writeMisses(byte misses)
    {
        writeLine($"Quantidade de erros da fase: {misses}");
    }
}
