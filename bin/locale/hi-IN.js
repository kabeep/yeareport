module.exports = {
    CMD_TITLE_COMMAND_ADD: 'जोड़ें',
    CMD_TITLE_COMMAND_REMOVE: 'हटाएँ',
    CMD_TITLE_COMMAND_CLEAR: 'साफ करें',
    CMD_TITLE_COMMAND_PRINT: 'विश्लेषण करें',
    CMD_TITLE_COMMAND_SHOW: 'पढ़ें',

    CMD_STATUS_PENDING: 'प्रतीक्षा करें',
    CMD_STATUS_SUCCESS: 'पूर्ण',
    CMD_STATUS_ERROR: 'विफल',

    CMD_DES_COMMAND_ADD: 'वर्तमान डायरेक्टरी को कतार में जोड़ें',
    CMD_DES_COMMAND_REMOVE: 'वर्तमान कार्य डायरेक्टरी को कतार से हटाएं',
    CMD_DES_COMMAND_CLEAR: 'कतार को साफ करें',
    CMD_DES_COMMAND_PRINT: 'कतार को मार्कडाउन फ़ाइल के रूप में आउटपुट करें',
    CMD_DES_COMMAND_SHOW: 'कतार में लॉग सूची दिखाएं',

    CMD_DES_OPTION_AUTHOR: '`auto` पर, git global config से खोजें, डिफॉल्ट सभी लॉग आउटपुट करें',
    CMD_DES_OPTION_SINCE: `किसी तारीख से आउटपुट शुरू करें, डिफॉल्ट है \`${new Date().getFullYear() - 1}-01-01\``,
    CMD_DES_OPTION_BEFORE: `किसी तारीख पर आउटपुट खत्म करें, डिफॉल्ट है \`${new Date().getFullYear() - 1}-12-31\``,
    CMD_DES_OPTION_LUNAR: 'વર્ષ અંતની રિપોર્ટ માટે ચંદ્ર કેલેન્ડરને અંતરાલ તરીકે ઉપયોગ કરો',
    CMD_DES_OPTION_OUTPUT: 'प्रिंट आउटपुट डायरेक्टरी, वर्तमान कार्य डायरेक्टरी के सापेक्ष, डिफॉल्ट User/Downloads`',
    CMD_DES_OPTION_OVERWRITE:
        'add ओवरराइट प्राधिकरण, जब वर्तमान कार्य डायरेक्टरी पहले से मौजूद हो तो ओवरराइट करने की क्रिया करें',
    CMD_DES_OPTION_PRETTY: 'प्रिंट सुंदर शीर्षक, इमोजी का इस्तेमाल करके Markdown शीर्षकों को सुंदर बनाएं',
    CMD_DES_EXAMPLE_OVERWRITE:
        'add कमांड के लिए अधिकार दें जब वर्तमान कार्य डायरेक्टरी के लॉग पहले से कतार में हों तो ओवरराइट करें',
    CMD_DES_EXAMPLE_AUTHOR: 'केवल लेखक kabeep के लॉग को कतार में जोड़ें',
    CMD_DES_EXAMPLE_SINCE_BEFORE: '2023-01-01 से 2024-01-01 तक के लॉग कतार में जोड़ें',
    CMD_DES_EXAMPLE_PRETTY: 'Markdown शीर्षक इस प्रकार आउटपुट होंगे # {emoji} {commit-type}',
};
