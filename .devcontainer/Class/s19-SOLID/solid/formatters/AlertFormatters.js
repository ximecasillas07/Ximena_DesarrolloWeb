export class AlertFormatter{
    static formatText(sensorData){
        return `[ALERT] Sensor ${sensorData.id} exceeded limit, value: ${sensorData.reading}`;
    }
    static formatHtml(sensorData){
        return`
        
        `;
    }

    static formatSocialMedia(sensorData){}
}