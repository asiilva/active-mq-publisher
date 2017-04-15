$(document).ready(function() {
    var steamUserid = getParam('steamid');

    if(steamUserid){
        getSteamUser(steamUserid, function(data){
            var userName = '';

            if(data.players){
                userName = data.players[0].personaname;
            }

            $('.li-user').removeAttr('style');
            $('.user-name').text(userName);
            $('.li-steam-auth').remove();
            $('.status-text').remove();
            $('.login-text').remove();
        });
    }

    function getParam(name){
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    function getSteamUser(steamUserid, cb){
        var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=F838BE3DBD1120A690A713365D6BA6F6&steamids=" + steamUserid;

        try{
            $.getJSON(url, function(data){
                cb(data);
            });
        }catch(e){
            console.log('An error has occured while trying to retrieve steam user information.', e);
        }
    };
});