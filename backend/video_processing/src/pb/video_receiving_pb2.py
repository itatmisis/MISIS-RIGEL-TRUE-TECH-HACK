# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: src/pb/video_receiving.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1csrc/pb/video_receiving.proto\x12\x02pb\"\xa2\x01\n\x0eSegmentRequest\x12\x10\n\x08\x66ilename\x18\x01 \x01(\t\x12\x0e\n\x06number\x18\x02 \x01(\x03\x12\x1e\n\x08taskType\x18\x03 \x01(\x0e\x32\x0c.pb.TaskType\x12\x37\n\x12\x63olorBlindnessType\x18\x04 \x01(\x0e\x32\x16.pb.ColorBlindnessTypeH\x00\x88\x01\x01\x42\x15\n\x13_colorBlindnessType\"+\n\x08Response\x12\x10\n\x08\x66ilename\x18\x02 \x01(\t\x12\r\n\x05video\x18\x01 \x01(\x0c\"(\n\x14VideoMetadataRequest\x12\x10\n\x08\x66ilename\x18\x01 \x01(\t*F\n\x12\x43olorBlindnessType\x12\x0e\n\nPROTANOPIA\x10\x00\x12\x10\n\x0c\x44\x45UTERANOPIA\x10\x01\x12\x0e\n\nTRITANOPIA\x10\x02*\\\n\x08TaskType\x12\x0b\n\x07NOTHING\x10\x00\x12\x0c\n\x08\x45PILEPSY\x10\x01\x12\x13\n\x0f\x43OLOR_BLINDNESS\x10\x02\x12 \n\x1c\x45PILEPSY_AND_COLOR_BLINDNESS\x10\x03\x62\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'src.pb.video_receiving_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _COLORBLINDNESSTYPE._serialized_start=288
  _COLORBLINDNESSTYPE._serialized_end=358
  _TASKTYPE._serialized_start=360
  _TASKTYPE._serialized_end=452
  _SEGMENTREQUEST._serialized_start=37
  _SEGMENTREQUEST._serialized_end=199
  _RESPONSE._serialized_start=201
  _RESPONSE._serialized_end=244
  _VIDEOMETADATAREQUEST._serialized_start=246
  _VIDEOMETADATAREQUEST._serialized_end=286
# @@protoc_insertion_point(module_scope)
