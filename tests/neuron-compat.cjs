// Offline legacy address, ADR-036, Cosmos graph and CosmWasm wire vectors.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { serializeSignDoc, pubkeyToAddress } = require("@cosmjs/amino");
const { Secp256k1, Secp256k1Signature, sha256 } = require("@cosmjs/crypto");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { MsgExecuteContract } = require("cosmjs-types/cosmwasm/wasm/v1/tx");
const { MsgCyberlink } = require("../build/codec/cyber/graph/v1beta1/tx");
const { createCyberAminoConverters } = require("../build/aminomsgs");
const { RegistryTypes } = require("../build/registryTypes");
const vectors = require("./fixtures/domain-v1.json");

test("CosmJS independently verifies frozen mudra domain addresses and ADR-036 bytes", async () => {
  for (const v of vectors) {
    const pubkey = Buffer.from(v.pubkey_hex, "hex");
    assert.equal(pubkeyToAddress({ type: "tendermint/PubKeySecp256k1", value: pubkey.toString("base64") }, v.hrp), v.address);
    const doc = { account_number: "0", chain_id: "", fee: { amount: [], gas: "0" }, memo: "",
      msgs: [{ type: "sign/MsgSignData", value: { data: Buffer.from(v.body).toString("base64"), signer: v.address } }], sequence: "0" };
    const bytes = serializeSignDoc(doc);
    assert.equal(Buffer.from(bytes).toString(), v.adr036_doc);
    const signature = Secp256k1Signature.fromFixedLength(Buffer.from(v.signature_hex, "hex"));
    assert.equal(await Secp256k1.verifySignature(signature, sha256(bytes), pubkey), true);
    assert.equal(await Secp256k1.verifySignature(signature, sha256(Buffer.from("changed")), pubkey), false);
  }
});

test("existing Cosmos account derivation and graph neuron field remain native to the old SDK", async () => {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about", { prefix: "pussy" });
  const [account] = await wallet.getAccounts();
  assert.equal(account.address, "pussy19rl4cm2hmr8afy4kldpxz3fka4jguq0a4l8rzm");
  assert.equal(Buffer.from(account.pubkey).toString("hex"), "024f4e2ad99c34d60b9ba6283c9431a8418af8673212961f97a77b6377fcd05b62");
  const msg = { neuron: "bostrom1fixture", links: [{ from: "QmFrom", to: "QmTo" }] };
  // Hand-encoded protobuf fixture: fields neuron=1, links=2; Link from=1,to=2.
  const wire = "0a0f626f7374726f6d3166697874757265120e0a06516d46726f6d1204516d546f";
  assert.equal(Buffer.from(MsgCyberlink.encode(msg).finish()).toString("hex"), wire);
  assert.deepEqual(MsgCyberlink.decode(Buffer.from(wire, "hex")), msg);
  const converter = createCyberAminoConverters()["/cyber.graph.v1beta1.MsgCyberlink"];
  assert.equal(converter.aminoType, "cyber/MsgCyberlink");
  assert.deepEqual(converter.fromAmino(converter.toAmino(msg)), msg);
  assert.equal(RegistryTypes.cyber.MsgCyberlink, "/cyber.graph.v1beta1.MsgCyberlink");
});

test("CosmWasm sender contract funds and payload keep their independent wire schema", () => {
  const msg = { sender: "sender", contract: "contract", msg: Uint8Array.from(Buffer.from("{}")), funds: [{ denom: "boot", amount: "7" }] };
  // Field tags 1,2,3,5 from the existing CosmWasm MsgExecuteContract schema.
  const wire = "0a0673656e6465721208636f6e74726163741a027b7d2a090a04626f6f74120137";
  assert.equal(Buffer.from(MsgExecuteContract.encode(msg).finish()).toString("hex"), wire);
  const decoded = MsgExecuteContract.decode(Buffer.from(wire, "hex"));
  assert.deepEqual({ ...decoded, msg: Uint8Array.from(decoded.msg) }, msg);
  assert.equal(RegistryTypes.cosmwasm.MsgExecuteContract, "/cosmwasm.wasm.v1.MsgExecuteContract");
});
