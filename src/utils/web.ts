/**
 * @param {} res - Http response object
 * @param {String} file - Html file path relative to htmlDir
 * @param {Number} status - Response status code
 */
function RenderHtml (res:any, file:string, status:number = 200) : void {
    res.status(status);
    res.sendFile(file);
}

/**
 * @param {} req req object
 * @returns {} cookies json
 */
function GetCookies (req: any): any  {
    const cookieStr = req.headers.cookie;
    var cookies = cookieStr.split('; ').reduce((res: any, cookie: string) => {
        const data = cookie.trim().split('=');
        return {...res, [data[0]]: data[1]}
    }, {});
    return cookies;
}

/**
 * @param {} req request object
 * @param {String} key cookie name
 * @returns {String} cookie value
 */
function GetCookie (req: any, key: string): string {
    const cookies = GetCookies(req);
    if (cookies.hasOwnProperty(key)) return cookies[key];
    else return "";
}

export { RenderHtml, GetCookies, GetCookie };