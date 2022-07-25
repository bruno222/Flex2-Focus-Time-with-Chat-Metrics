import { RUNTIMEDOMAIN, getConfig } from "../config";

export const getAdditionalMetrics = async (payload, store) => {
    const configuredFeatures = getConfig()

    const {
        task: {
            sid,
            taskSid,
            attributes: {
                conversationSid
            }
        }
    } = payload
    const state = store.getState()
    const reservationAcceptedTime = window.handleTimeTracker.reservations[sid].reservationAcceptedTime;
    const workerName = state.flex.worker.attributes.contact_uri.split(":")[1];
    const token = state.flex.session.ssoTokenPayload.token;

    console.log(payload, 'blabla10');
    console.log(conversationSid, 'blabla11');
    console.log(taskSid, 'blabla12');


    const response = await fetch(`${RUNTIMEDOMAIN}/get-channel-messages`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            conversationSid: conversationSid,
            token: token,
            workerName: workerName,
            reservationAccepted: reservationAcceptedTime,
            configuredFeatures: configuredFeatures
        })

       // body: `conversationSid=${conversationSid}&token=${token}&workerName=${workerName}&reservationAccepted=${reservationAcceptedTime}&configuredFeatures=${configuredFeatures}`
    });
    const messagesResponse = await response.json();

    return messagesResponse

}