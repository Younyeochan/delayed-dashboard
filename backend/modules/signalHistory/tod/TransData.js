const TransData = {};

TransData.transImporFlag = (imporFlag) => {
    let result = "";

    switch (imporFlag) {
        case 0:
            result = "MI";
            break;
        case 1:
            result = "CI";
            break;
        case 2:
            result = "SCI";
            break;
        case 3:
            result = "램프";
            break;
        case 4:
            result = "연등";
            break;
    }

    return result;
};

TransData.transAutoOnline = (autoOnline) => {
    let result = "";

    if (autoOnline === 0) {
        result = "수동";
    } else {
        result = "자동";
    }

    return result;
};

TransData.transLampType = (lampType) => {
    let result = "";

    if (lampType === 0) {
        result = "3색";
    } else {
        result = "4색";
    }

    return result;
};

TransData.transDays = (index) => {
    let result = "";

    switch (index) {
        case 1:
            result = "일요일";
            break;
        case 2:
            result = "월요일";
            break;
        case 3:
            result = "화요일";
            break;
        case 4:
            result = "수요일";
            break;
        case 5:
            result = "목요일";
            break;
        case 6:
            result = "금요일";
            break;
        case 7:
            result = "토요일";
            break;
    }

    return result;
};

TransData.addZero = (date) => {
    if (Number(date) < 10) {
        date = "0" + Number(date).toString();
        return date;
    } else {
        return Number(date).toString();
    }
};

module.exports = TransData;
