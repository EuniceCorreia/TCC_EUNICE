using System;
using System.Collections;
using UnityEngine;

public static class MonoBehaviourExtensions
{
    // Typed alternative to Invoke("methodName", delay): no magic strings and
    // it accepts methods from other objects or lambdas.
    public static Coroutine InvokeAfter(
        this MonoBehaviour owner, float delay, Action action)
    {
        return owner.StartCoroutine(InvokeAfterRoutine(delay, action));
    }

    private static IEnumerator InvokeAfterRoutine(float delay, Action action)
    {
        yield return new WaitForSeconds(delay);
        action();
    }
}
