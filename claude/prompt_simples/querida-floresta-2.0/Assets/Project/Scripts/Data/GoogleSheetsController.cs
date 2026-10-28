using UnityEngine;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Services;
using System.Collections.Generic;
using System.Threading;
using System;

public class GoogleSheetsController : MonoBehaviour
{
    private const string SHEET = "data";
    private const string FINAL_COL = "L";
    private const string APPLICATION_NAME = "querida-floresta";
    private static SheetsService service;

    public void StartSheets()
    {
        string[] scopes = {SheetsService.Scope.Spreadsheets};
        GoogleCredential googleCredential = GoogleCredential
            .FromJson(Credentials.CREDENTIALS)
            .CreateScoped(scopes);

        service = new SheetsService(new BaseClientService.Initializer() {
            HttpClientInitializer = googleCredential,
            ApplicationName = APPLICATION_NAME
        });

        TestConnection();
    }

    // Returns false and a message to show the player if it fails
    public bool TryStartSheets(out string errorMessage)
    {
        try {
            StartSheets();
            errorMessage = null;
            return true;
        }
        catch (System.Net.Http.HttpRequestException) {
            errorMessage = "Erro de conexão com a rede";
        }
        catch (Exception) {
            errorMessage = "Um erro inesperado aconteceu";
        }
        return false;
    }

    private IList<IList<object>> GetValues(string range)
    {
        var request = service.Spreadsheets.Values.Get(Credentials.ID, range);
        return request.Execute().Values;
    }

    private void TestConnection()
    {
        GetValues($"{SHEET}!A1:A1");
    }

    public static bool ValidateId(string id)
    {
        int parsedId;
        return int.TryParse(id, out parsedId) && parsedId > 0;
    }

    public string[] FindEntry(string id)
    {
        if (!ValidateId(id)) return null;

        var rows = GetValues($"{SHEET}!A{id}:{FINAL_COL}{id}");
        if (rows == null) return null;

        string[] data = new string[rows[0].Count];
        for (int i = 0; i < data.Length; i++) data[i] = rows[0][i].ToString();

        return data;
    }

    // Returns the zero-based row index of the user, or -1 if not found
    public int FindUser(string user)
    {
        var rows = GetValues($"{SHEET}!B:B");
        if (rows == null) return -1;

        for (int i = 0; i < rows.Count; i++) {
            if (rows[i][0].Equals(user)) return i;
        }

        return -1;
    }

    public bool CreateEntry(IList<object> playerData)
    {
        var data = new List<object>() {"=LIN()"};
        data.AddRange(playerData);
        var valueRange = new ValueRange() {
            Values = new List<IList<object>> {data}
        };

        var append = service.Spreadsheets.Values.Append(
            valueRange, Credentials.ID, $"{SHEET}!A:{FINAL_COL}"
        );
        append.ValueInputOption = SpreadsheetsResource.ValuesResource.
            AppendRequest.ValueInputOptionEnum.USERENTERED;

        try { append.Execute(); }
        catch (Exception) { return false; }

        return true;
    }

    public void UpdateEntry(string id, IList<object> data)
    {
        if (!ValidateId(id)) return;

        var valueRange = new ValueRange() {
            Values = new List<IList<object>> {data}
        };

        var update = service.Spreadsheets.Values.Update(
            valueRange, Credentials.ID, $"{SHEET}!B{id}:{FINAL_COL}{id}"
        );
        update.ValueInputOption = SpreadsheetsResource.ValuesResource.
            UpdateRequest.ValueInputOptionEnum.USERENTERED;

        update.Execute();
    }

    public void SavePlayerProgress()
    {
        int id = FindUser(Player.Instance.Name) + 1;
        if (id != 0)
            UpdateEntry(id.ToString(), Player.Instance.ToObjectList());
    }

    // Marks the activity as completed and saves the progress in background.
    // Returns false if it had already been completed (nothing is saved).
    public bool CompleteActivity(int activityIndex)
    {
        if (Player.Instance.ScenesCompleted[activityIndex]) return false;

        Player.Instance.ScenesCompleted[activityIndex] = true;
        new Thread(SavePlayerProgress).Start();
        return true;
    }
}
