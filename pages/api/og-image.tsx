import { withOGImage } from 'next-api-og-image';
import ct from 'countries-and-timezones';
import { RiTimer2Line } from 'react-icons/ri';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ReactCountryFlag from 'react-country-flag';

dayjs.extend(timezone);
dayjs.extend(utc);

enum QueryParams {
  'title',
  'time',
  'timezones',
  'primaryColor',
}

interface TimezoneListData {
  timezone: string;
  time: string;
  country: string;
}
export default withOGImage<'query', keyof typeof QueryParams>({
  strategy: 'query',
  template: {
    react: ({ title, time, timezones, primaryColor }) => {
      let timezonesListData: TimezoneListData[] = [];
      if (timezones) {
        const tzList = timezones.split(',').slice(0, 8);
        const tzListData: TimezoneListData[] = tzList.map((tz) => ({
          timezone: tz,
          time: dayjs(time).tz(tz).format('DD MMM hh:mm A'),
          country: ct.getTimezone(tz)?.countries[0] || '',
        }));
        timezonesListData = tzListData;
      }

      return (
        <html lang="en">
          <body
            style={{
              display: 'flex',
              margin: 0,
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
          >
            {/* LEFT SECTION: EVENT DETAILS */}
            <div
              style={{
                flex: 7,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: timezonesListData.length === 0 ? 'center' : 'unset',
                backgroundColor: `#${primaryColor || '67bd64'}`,
                padding: '50px',
              }}
            >
              {/* TIMESWITCH LOGO */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div
                  style={{
                    padding: '8px',
                    backgroundColor: '#00000077',
                    borderRadius: '8px',
                  }}
                >
                  <RiTimer2Line size={35} color="white" />
                </div>
                <h1 style={{ fontSize: '40px' }}>
                  <span style={{ color: 'white' }}>Time</span>
                  <span style={{ opacity: '0.5' }}>Switch</span>
                </h1>
              </div>

              {/* EVENT TITLE */}
              <h1
                style={{
                  fontSize: timezonesListData.length > 0 ? '60px' : '65px',
                  color: '#ffffff',
                  textDecoration: 'underline',
                  maxWidth: '600px',
                  textAlign: timezonesListData.length > 0 ? 'unset' : 'center',
                }}
              >
                {title}
              </h1>

              {/* EVENT TIMES */}
              <h2
                style={{
                  fontSize: '30px',
                  color: '#ffffff',
                  fontWeight: 'normal',
                }}
              >
                {`${dayjs(time).tz('UTC').format('DD MMM YYYY hh:mm A')} `}
                <b>UTC</b>
              </h2>
            </div>
            {/* RIGHT SECTION: TIMEZONE LIST DISPLAY */}
            {timezonesListData.length > 0 && (
              <div
                style={{
                  flex: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#eeeeee',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    width: '90%',
                  }}
                >
                  {timezonesListData.map((tz) => (
                    <div
                      key={tz.timezone}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                      }}
                    >
                      <div style={{ padding: '5px 20px' }}>
                        <ReactCountryFlag
                          countryCode={tz.country}
                          style={{
                            fontSize: '2em',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'start',
                          padding: '20px',
                          borderLeft: '1px solid #eee',
                        }}
                      >
                        <div
                          style={{ fontSize: '15px', fontWeight: 'normal', marginBottom: '10px' }}
                        >
                          {tz.timezone.replace(/\/.*\//, '/')}
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{tz.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </body>
        </html>
      );
    },
  },
  cacheControl: 'max-age 54000, must-revalidate',
  dev: {
    inspectHtml: false,
  },
});
