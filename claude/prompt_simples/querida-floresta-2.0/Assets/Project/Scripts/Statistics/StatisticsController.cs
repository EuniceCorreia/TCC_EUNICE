using System.Text;
using UnityEngine;
using UnityEngine.UI;

public class StatisticsController : MonoBehaviour
{
    private const string NOT_COMPLETED = "Atividade ainda não completa";
    [SerializeField] private Text[] reportTxt;

    private static string ErrorQuantity(byte sceneMisses)
    {
        return "\t\tQuantidade de erros: " + sceneMisses + "\n";
    }

    private static string ErrorQuantity(string noun, byte[] sceneMisses)
    {
        StringBuilder str = new StringBuilder("\t\tQuantidade de erros\n");

        for (int i = 0; i < sceneMisses.Length; i++)
            str.Append($"\t\t\t{noun} {i + 1}: {sceneMisses[i]}\n");

        return str.ToString();
    }

    private static string ResponseTime(int activity)
    {
        double responseTime = ApplicationModel.PlayerResponseTime[activity];
        return $"\t\tTempo de início: {responseTime:F2} s";
    }

    // Details of each activity, in ActivityIndex order
    private static string[] ActivityDetails()
    {
        return new[] {
            ErrorQuantity("Fase", ApplicationModel.Scene1Misses) +
                ResponseTime(ActivityIndex.Scene1),
            ErrorQuantity(ApplicationModel.Scene2Misses) +
                ResponseTime(ActivityIndex.Scene2),
            ErrorQuantity("Questão", ApplicationModel.Scene3Misses) +
                ResponseTime(ActivityIndex.Scene3),
            ErrorQuantity(ApplicationModel.Scene4Misses),
            ErrorQuantity(ApplicationModel.Scene5Misses),
            ErrorQuantity(ApplicationModel.Scene6Misses),
            ErrorQuantity(ApplicationModel.Scene7Misses),
            ErrorQuantity(ApplicationModel.Scene8Misses),
            ErrorQuantity(ApplicationModel.Scene9Misses),
            ErrorQuantity("Questão", ApplicationModel.Scene10Misses)
        };
    }

    void Start()
    {
        string[] details = ActivityDetails();

        for (int i = 0; i < reportTxt.Length; i++) {
            reportTxt[i].text = Player.Instance.ScenesCompleted[i]
                ? $"Atividade {i + 1}\n" + details[i]
                : NOT_COMPLETED;
        }
    }
}
