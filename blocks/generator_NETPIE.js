Blockly.JavaScript['netpie.setup'] = function(block) {
	var text_appid = block.getFieldValue('appid');
	var text_key = block.getFieldValue('key');
	var text_secret = block.getFieldValue('secret');
	var text_alias = block.getFieldValue('alias');

	var code = '';
	code += '#EXTINC#include <WiFi.h>#END\n';
	code += '#EXTINC#include <MicroGear.h>#END\n';
	code += '#VARIABLE #define APPID   "' + text_appid + '" #END\n';
	code += '#VARIABLE #define KEY     "' + text_key + '" #END\n';
	code += '#VARIABLE #define SECRET  "' + text_secret + '" #END\n';
	code += '#VARIABLE #define ALIAS   "' + text_alias + '" #END\n';
	code += '#VARIABLE WiFiClient client; #END\n';
	code += '#VARIABLE MicroGear microgear(client); #END\n';
	code += '\n';
	code += 'microgear.on(CONNECTED, [](char *attribute, uint8_t* msg, unsigned int msglen) {\n';
    code += '  microgear.setAlias(ALIAS);\n';
    code += '});\n';
	code += 'microgear.init(KEY, SECRET, ALIAS);\n';
	code += 'microgear.connect(APPID);\n';
	return code;
};

Blockly.JavaScript['netpie.loop'] = function(block) {
	var code = 'microgear.loop();\n';
	return code;
};

Blockly.JavaScript['netpie.on_rev'] = function(block) {
	var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
	var code = '';
	code += 'microgear.on(MESSAGE, [](char *topic, uint8_t* msg, unsigned int msglen) {\n';
    code += '  msg[msglen] = \'\\0\';\n';
    code += statements_callback;
    code += '});\n';
	return code;
};

Blockly.JavaScript['netpie.chat'] = function(block) {
	var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	var text_topic = block.getFieldValue('topic');
	var code = 'microgear.chat(ALIAS, String("' + text_topic + '").c_str());\n';
	return code;
};

Blockly.JavaScript['netpie.get_topic'] = function(block) {
	var code = 'String(topic)';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie.get_number'] = function(block) {
	var code = '(String((char*)msg).toFloat())';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie.get_text'] = function(block) {
	var code = '(String((char*)msg))';
	return [code, Blockly.JavaScript.ORDER_NONE];
};



