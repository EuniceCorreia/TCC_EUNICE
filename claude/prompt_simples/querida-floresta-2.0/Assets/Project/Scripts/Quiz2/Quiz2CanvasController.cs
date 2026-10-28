using UnityEngine;

public class Quiz2CanvasController : QuizCanvasController
{
    [SerializeField] private GameObject question1, question2;

    public void changeToQuestionTwo()
    {
        question1.SetActive(false);
        question2.SetActive(true);
    }
}
