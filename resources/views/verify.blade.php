<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">

    <title>Verificación de Email - GrandSpectra</title>
    <style>
        :root {
            color-scheme: light;
            supported-color-schemes: light;
        }

        @font-face {
            font-family: 'GTVCS';
            src: url('http://s3.lestro.top/grandspectra/fonts/CharisSILR.ttf') format('opentype');
            font-weight: 500;
            font-style: normal;
        }

        @font-face {
            font-family: 'CharisSIL';
            src: url('http://s3.lestro.top/grandspectra/fonts/CharisSILB.ttf') format('opentype');
            font-weight: 100;
            font-style: normal;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            font-family: 'GTVCS', serif;
            background-color: #111111;
            color: #fff1e0;
            line-height: 1.6;
            padding: 0.5rem;
        }

        #title {
            font-family: "CharisSIL", serif;
            font-size: 3rem;
            font-weight: 700;
            color: #fff1e0;
            text-align: center;
            text-shadow: 0 0 3px #880000, 0 0 5px #880000, 0 0 10px #880000, 0 0 15px #880000;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #252020;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(251, 43, 43, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #191616 0%, #252020 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 2px solid #FB2B2B;
        }

        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #FB2B2B;
            text-shadow: 0 0 20px #FB2B2B;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }

        .subtitle {
            color: #a89f8e;
            font-size: 16px;
            font-weight: 400;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #fff1e0;
            margin-bottom: 20px;
        }

        .message {
            font-size: 16px;
            color: #d1c6b5;
            margin-bottom: 30px;
            line-height: 1.7;
        }

        .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #FB2B2B 0%, #880000 100%);
            color: #FFFFFF;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 0 20px rgba(251, 43, 43, 0.3);
            transition: all 0.3s ease;
            margin: 20px 0;
        }

        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .alternative-text {
            font-size: 14px;
            color: #736c60;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #3e3838;
        }

        .url-text {
            word-break: break-all;
            background-color: #191616;
            padding: 10px;
            border-radius: 4px;
            border-left: 3px solid #FB2B2B;
            margin: 10px 0;
            font-family: monospace;
            font-size: 12px;
        }

        .footer {
            background-color: #191616;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #3e3838;
        }

        .footer-text {
            color: #736c60;
            font-size: 14px;
            margin-bottom: 15px;
        }

        .social-links {
            margin-top: 20px;
        }

        .warning {
            background-color: rgba(251, 43, 43, 0.1);
            border: 1px solid #FB2B2B;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #d1c6b5;
        }

        .highlight {
            color: #FFCC33;
            font-weight: 600;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }

            .header, .content, .footer {
                padding: 20px;
            }

            .logo {
                font-size: 28px;
            }

            .greeting {
                font-size: 20px;
            }

            .verify-button {
                padding: 14px 30px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="header">
        <h1 id="title">GRAND SPECTRA</h1>
        <div class="subtitle">The social network for film lovers</div>
    </div>

    <div class="content">
        <div class="greeting">Welcome!</div>

        <div class="message">
            Thank you for registering on our platform. To complete your registration and start enjoying
            <span class="highlight">the social network for film and tv shows lovers</span>, we need to
            verify your email address.
        </div>

        <div class="button-container">
            <a class="verify-button" href="{{$url}}" target="_blank">
                Verify email
            </a>
        </div>

        <div class="warning">
            <strong>⚠️ </strong> This verification link will expire in 30 minutes for security reasons.
        </div>

        <div class="alternative-text">
            If you have problems with the button above, copy and paste the following link into your browser:
            <div class="url-text">{{$url}}</div>
        </div>
    </div>

    <div class="footer">
        <div class="footer-text">
            If you did not create an account on Grand Spectra, you can safely ignore this email.
        </div>
        <div class="footer-text">
            © Grand Spectra. All rights reserveds.
        </div>
        <div class="footer-text" style="margin-top: 10px; font-size: 12px;">
            Organize your content • Share with your friends • Updated daily
        </div>
    </div>
</div>
</body>
</html>
