//TimeKeeper
var timeKeeperString = "";
socket.on('saveTimeKeeperString', function (string)
{
    timeKeeperString = string;

    console.log(timeKeeperString);

    var username = 'testing';
    var password = '12345678';

    var connection = loginDataBase();
    connection.query('SELECT * from users WHERE username="' + username + '"', function (err, rows, fields)
    {
        if (!err)
        {
            console.log(password);
            console.log(rows[0].password);

            //if (password == rows[0].password)
            {
                console.log("Test");
                var writeConn = loginDataBase();

                writeConn.query('INSERT INTO timeKeeper VALUES("' + username + '","' +encodeURI(timeKeeperString) + '","Test2");', function (err)
                {
                    console.log(err);

                    //console.log(decodeURI(encodeURI(timeKeeperString)));
                });

            }
        }
        else
            console.log('Error while performing Query.');
    });

    connection.end(0);
});


socket.on('loadTimeKeeper', function (string)
{

    console.log(string);
    var username = 'testing';
    var password = '12345678';


    var readConn = loginDataBase();

    readConn.query('SELECT saveProjectArray FROM timeKeeper', function (err, rows, fields)
    {
        console.log(err);
        console.log("Test");

        //console.log(decodeURI(encodeURI(timeKeeperString)));
    });





    readConn.end(0);
});



