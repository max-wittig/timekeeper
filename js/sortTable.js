
    function sortTable()
    {
        var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

        //bubbleSort
        for (var i = 0; i < saveObjectArray.length; i++)
        {
            for (var j = 0; j < (saveObjectArray.length - i - 1); j++)
            {
                var getDateInMoment = moment(saveObjectArray[j].startTime, "DD.MM.YYYY - HH:mm:ss");
                var seconds = getDateInMoment.unix();

                var getDateInMoment2 = moment(saveObjectArray[j + 1].startTime, "DD.MM.YYYY - HH:mm:ss");
                var seconds2 = getDateInMoment2.unix();

                if (seconds > seconds2)
                {
                    var temp = saveObjectArray[j];
                    saveObjectArray[j] = saveObjectArray[j + 1];
                    saveObjectArray[j + 1] = temp;

                }

            }
        }


        localStorage.setItem("saveObjectArray", JSON.stringify(saveObjectArray));

    }



