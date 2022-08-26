const _ = require('lodash');
const DateLib = require('dayjs');
const utc = require('dayjs/plugin/utc');
const baseLayout = require('./layout/base');

DateLib.extend(utc);

module.exports = ({ orderNo, orderDate, lineItems, shipping }) => {
  const styles = {
    bgColor: '#f9f9f9',
    headerColor: '#245D9C',
    headerTextColor: '#ffffff',
    footerTextColor: '#333333',
  };

  const odDate = DateLib(
    new Date(orderDate).toLocaleString('km-KH', {
      timeZone: 'Asia/Phnom_Penh',
    })
  ).format('DD-MMM-YYYY hh:mm:ss A');

  const { fname, lname, address, phone } = shipping;
  const name = `${fname} ${lname}`;
  let items = '';
  let total = 0;

  _.forEach(lineItems, (item) => {
    console.log('item', item);
    // const { regPrice, salePrice } = item.pricing || {};
    // const price = salePrice > 0 ? salePrice : regPrice;
    const price = item.pr;
    const totalLineItem = price * item.orderQty;

    total += totalLineItem;
    items += `
      <tr>
        <td align="left" width="50%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${
          item.pName
        }</td>
        <td align="left" width="16.67%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${
          item.orderQty
        }</td>
        <td align="left" width="33.33%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">$${price.toFixed(
          2
        )}</td>
      </tr>
    `;
  });

  const body = `
  <body style="background-color: ${styles.bgColor};">
    <!-- start preheader -->
    <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
      A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- start logo -->
      <tr>
        <td align="center" bgcolor="${styles.bgColor}">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" valign="top" style="padding: 36px 24px;">
                <a href="https://www.koaz.com" target="_blank" style="display: inline-block;">
                  <img src="https://www.koaz.com/12f2b018d1176622ab3cee3cd39f6882.png" alt="Logo" border="0" width="128" style="display: block; width: 128px; max-width: 128px; min-width: 128px;">
                </a>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end logo -->

      <!-- start hero -->
      <tr>
        <td align="center" bgcolor="${styles.bgColor}">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -1px; line-height: 28px;">Customer Order</h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end hero -->

      <!-- start copy block -->
      <tr>
        <td align="center" bgcolor="${styles.bgColor}">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <!-- start copy -->
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <p style="margin: 0;">Order No: <strong>${orderNo}<strong></p>
                <p style="margin: 0;">Order Name: <strong>${name}<strong></p>
                <p style="margin: 0;">Order Date: <strong>${odDate}<strong></p>
                <p style="margin: 0;">Phone: <strong>${phone}<strong></p>
              </td>
            </tr>
            <!-- end copy -->

            <!-- start receipt table -->
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="left" bgcolor="${
                      styles.headerColor
                    }" width="50%" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; color: ${
    styles.headerTextColor
  }"><strong>Product Name</strong></td>
  <td align="left" bgcolor="${
    styles.headerColor
  }" width="16.67%" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; color: ${
    styles.headerTextColor
  }"><strong>Qty</strong></td>
                    <td align="left" bgcolor="${
                      styles.headerColor
                    }" width="33.33%" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; color: ${
    styles.headerTextColor
  }"><strong>Price</strong></td>
                  </tr>

                  ${items}

                  <tr>
                    <td colspan="2" align="right" bgcolor="#f0f0f0" width="66.66%" style="padding:6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"><strong>Total</strong></td>
                    <td align="left" bgcolor="#f0f0f0" width="33.33%" style="padding:6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"><strong>$${total.toFixed(
                      2
                    )}</strong></td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end reeipt table -->

          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end copy block -->

      <!-- start receipt address block -->
      <tr>
        <td align="center" bgcolor="${
          styles.bgColor
        }" valign="top" width="100%">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" valign="top" style="font-size: 0; border-bottom: 3px solid #d4dadf">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="left" valign="top" width="300">
                <![endif]-->
                <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 300px;">
                    <tr>
                      <td align="left" valign="top" style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p><strong>Delivery Address</strong></p>
                        <p>${address}</p>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                <td align="left" valign="top" width="300">
                <![endif]-->
                <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 300px;">
                    <tr>
                      <td align="left" valign="top" style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p><strong>Billing Address</strong></p>
                        <p></p>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end receipt address block -->

      <!-- start footer -->
      <tr>
        <td align="center" bgcolor="${styles.bgColor}" style="padding: 24px;">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

            <!-- start permission -->
            <tr>
              <td align="center" bgcolor="${
                styles.bgColor
              }" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: ${
    styles.footerTextColor
  };">
                <p style="margin: 0;">Thank you</p>
              </td>
            </tr>
            <!-- end permission -->

            <!-- start unsubscribe -->
            <tr>
              <td align="center" bgcolor="${
                styles.bgColor
              }" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: ${
    styles.footerTextColor
  };">
                <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.koaz.com" target="_blank">unsubscribe</a> at any time.</p>
                <p style="margin: 0;">koa Address</p>
              </td>
            </tr>
            <!-- end unsubscribe -->

          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end footer -->

    </table>
    <!-- end body -->
  </body>
  `;

  return baseLayout(body);
};
